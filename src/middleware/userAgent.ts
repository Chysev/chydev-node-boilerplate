import { UAParser } from 'ua-parser-js';
import { UserAgentInfo, UserAgentOptions } from '@/types';
import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * User Agent Middleware for Production
 * 
 * This middleware parses the user agent string and adds the parsed information
 * to the request object for use in other parts of the application.
 * 
 * Features:
 * - Parses browser name, version, engine, OS, device type
 * - Detects bots/crawlers
 * - Adds device type classification (mobile, tablet, desktop)
 * - Tracks browser capabilities
 * - Can block outdated browsers (configurable)
 */


/**
 * List of common bot user agent patterns
 */
const BOT_UA_PATTERNS = [
    'bot', 'spider', 'crawl', 'slurp', 'scraper',
    'facebookexternalhit', 'whatsapp', 'telegram',
    'skype', 'wget', 'curl', 'lighthouse',
    'headless', 'puppeteer', 'selenium', 'phantom'
];

/**
 * Check if a user agent string belongs to a known bot/crawler
 */
const isBot = (ua: string): boolean => {
    if (!ua) return false;

    const lowerUA = ua.toLowerCase();
    return BOT_UA_PATTERNS.some(pattern => lowerUA.includes(pattern));
};

/**
 * Determine device type based on parsed UA and other signals
 */
const getDeviceType = (parser: UAParser.IResult): 'mobile' | 'tablet' | 'desktop' | 'bot' | 'unknown' => {
    if (isBot(parser.ua || '')) return 'bot';

    const { device } = parser;

    if (device.type === 'mobile') return 'mobile';
    if (device.type === 'tablet') return 'tablet';
    if (!device.type && parser.os.name) return 'desktop';

    return 'unknown';
};

/**
 * Compare version strings (e.g., "13.0.1" > "12.1.0")
 */
const compareVersions = (version1: string, version2: string): number => {
    const parts1 = version1.split('.').map(Number);
    const parts2 = version2.split('.').map(Number);

    const maxLength = Math.max(parts1.length, parts2.length);

    for (let i = 0; i < maxLength; i++) {
        const part1 = parts1[i] || 0;
        const part2 = parts2[i] || 0;

        if (part1 > part2) return 1;
        if (part1 < part2) return -1;
    }

    return 0;
};

/**
 * Check if browser version meets minimum requirements
 */
const isAcceptableBrowser = (
    browser: { name: string | undefined; version: string | undefined; },
    minVersions: { [key: string]: string }
): boolean => {
    if (!browser.name || !browser.version) return true; // Accept if we can't determine

    const minVersion = minVersions[browser.name.toLowerCase()];
    if (!minVersion) return true; // No minimum set for this browser

    return compareVersions(browser.version, minVersion) >= 0;
};

/**
 * User Agent middleware factory function
 */


export const userAgent = (options: UserAgentOptions = {}): RequestHandler => {
    const {
        blockOldBrowsers = false,
        minBrowserVersions = {
            chrome: '90.0.0',
            firefox: '90.0.0',
            safari: '14.0.0',
            'mobile safari': '14.0.0',
            opera: '80.0.0',
            edge: '90.0.0'
        }
    } = options;

    return (req, res, next) => {
        const userAgentString = req.headers['user-agent'] || '';
        const parser = new UAParser(userAgentString);
        const result = parser.getResult();

        req.userAgent = {
            browser: {
                name: result.browser.name,
                version: result.browser.version,
                major: result.browser.major
            },
            engine: {
                name: result.engine.name,
                version: result.engine.version
            },
            os: {
                name: result.os.name,
                version: result.os.version
            },
            device: {
                vendor: result.device.vendor,
                model: result.device.model,
                type: result.device.type
            },
            deviceType: getDeviceType(result),
            isBot: isBot(userAgentString),
            raw: userAgentString
        };

        if (
            blockOldBrowsers &&
            !req.userAgent.isBot &&
            !isAcceptableBrowser(req.userAgent.browser, minBrowserVersions)
        ) {
            res.status(400).send('Your browser is outdated.');
            return; // ensure return type is `void`
        }

        next();
    };
};


// Export a production-ready configuration
export default userAgent;