import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parseEnv } from "node:util";

import { APP_VARIANTS, type AppVariant } from "../app-variants/index.ts";

function readAppVariant(): AppVariant {
  const value = process.env.APP_VARIANT ?? "";
  if (value === "") {
    throw new Error(
      `APP_VARIANT 가 설정되지 않았습니다. npm run start:local 처럼 환경이 붙은 스크립트로 실행하거나 APP_VARIANT=${APP_VARIANTS.join("|")} 를 지정해 주세요.`,
    );
  }
  const variant = APP_VARIANTS.find((item) => item === value);
  if (variant === undefined) {
    throw new Error(
      `APP_VARIANT 는 ${APP_VARIANTS.join(" · ")} 중 하나여야 합니다. (받은 값 : ${value})`,
    );
  }
  return variant;
}

/**
 * envs/<APP_VARIANT>.env 를 process.env 에 채운다. 셸·CI 에서 이미 주입된 값이 우선한다.
 * process.env 를 직접 채우는 이유는 이후 실행되는 gradle · xcodebuild 에도 같은 값이 전달되게 하기 위해서다.
 */
export function loadVariantEnv(projectRoot: string) {
  const variant = readAppVariant();
  const envFilePath = join(projectRoot, "envs", `${variant}.env`);
  if (existsSync(envFilePath)) {
    const fileEnv = parseEnv(readFileSync(envFilePath, "utf8"));
    for (const [name, value] of Object.entries(fileEnv)) {
      if (process.env[name] === undefined) {
        process.env[name] = value;
      }
    }
  }
  process.env.APP_VARIANT = variant;
  return variant;
}
