type ConfigItem<T> = Record<string, T>;
type Mapping = ConfigItem<string>;
type IsPassportProfile = { __isPassport: boolean };
type IsMeetLInksProfile = { __isMeetLinks: boolean };
type ProfileConfig = { mapping?: Mapping } & Partial<IsMeetLInksProfile & IsPassportProfile>;
type RuntimeProfileConfig = ConfigItem<ProfileConfig>;
type RuntimeConfig = ConfigItem<RuntimeProfileConfig>;


export const getRuntimeValueByKey = (key: string): string => {
  if (!Reflect.has(process.env, key)) throw new Error(`Required parameter ${key} not set`);

  return Reflect.get(process.env, key);
};

export const getProfileConfig = (config: RuntimeConfig = require('./profile.config.json')): ProfileConfig => {
  const [ configKey ]: string[] = Object.keys(config);

  return config[configKey][getRuntimeValueByKey(configKey)];
};

const { mapping = {}, __isMeetLinks = false, __isPassport = false } = getProfileConfig();

export const isPassportProfile = (): boolean => __isPassport;
export const isMeetLinksProfile = (): boolean => __isMeetLinks;

export const getRuntimeConfig = (): ConfigItem<string> =>
  Object.entries(mapping).reduce((_cnf, [ k, v ]: string[]) =>
    Object.defineProperty(_cnf, v, { value: getRuntimeValueByKey(k), enumerable: true }), {})
;

