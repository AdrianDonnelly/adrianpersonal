import {type Config, ConfigSchema} from "./schemas";

const configPath = './articles/config.json';

async function ReadConfig(): Promise<Config> {
    const config = Bun.file(configPath, { type: 'application/json' });
    const rawConfig = await config.json();
    const parsed = await ConfigSchema.validate(rawConfig) as unknown as Config;
    parsed.featured = parsed.featured.map((id) => {
        id = id.replace(/-/g, '_');
        id = '_' + id.trim();
        return id;
    });
    return parsed;
};

export {
    ReadConfig
}