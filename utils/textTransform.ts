export type TransformFunction = (text: string) => string;

export const transformText = (text: string, ...transforms: TransformFunction[]): string => {
    return transforms.reduce((result, transform) => transform(result), text);
};

export const withLimit = (limit: number, rest: string = '...'): TransformFunction => {
    return (text: string) => text.length > limit ? `${text.slice(0, limit)}${rest}` : text;
};

export const withCapitalize: TransformFunction = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

export const withLineBreaks: TransformFunction = (text: string) => {
    return text.replace(/\n/g, ' ');
};
