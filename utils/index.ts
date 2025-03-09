import { ITEMS_PER_PAGE } from "@/constants";
import { User } from "@/types";

export async function checkPassword(password: string, inputPassword: string) {

    return password === inputPassword;
}

export function limitText(text: string, limit: number = 100): string {
    return text.length > limit ? text.substring(0, limit).trim() + "..." : text;
}

export function replaceString(text: string, replacement: string = '', term: string = '\n'): string {
    const regex = new RegExp(term, 'g');
    return text.replace(regex, replacement);
}

export function capitalize(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function getAvatarUser(userId: string | number): string {
    return `https://i.pravatar.cc/300?img=${userId}`;
}

export const getPaginationData = (currentPage: number) => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return {
        start,
        limit: ITEMS_PER_PAGE
    };
};

export const formatSessionUser = (session: User): User => ({
    id: session.id,
    name: session.name,
    email: session.email,
    username: session?.email?.split('@')[0] || 'semusername',
    address: {
        street: 'Rua Oscar Araripe',
        suite: '1298',
        city: 'Pacatuba',
        zipcode: '61809-065',
    },
    company: {
        name: 'Soffia',
        catchPhrase: 'Analista de sistemas',
        bs: 'Aprenda a programar do zero'
    },
    phone: '(85) 98885-5793'
});