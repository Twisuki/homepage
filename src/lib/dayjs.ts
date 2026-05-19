import type { Dayjs } from "dayjs"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import isBetween from "dayjs/plugin/isBetween"

dayjs.extend(customParseFormat)
dayjs.extend(isBetween)

export default dayjs
export type { Dayjs }
