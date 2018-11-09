declare module 'date-fns/format' {
  declare export default function format(
    date: Date | string | number,
    format: string,
    options?: any
  ): string
}
