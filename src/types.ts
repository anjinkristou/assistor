import { ReduxState, Record, Identifier } from 'react-admin';

export type ThemeName = 'light' | 'dark';

export interface AppState extends ReduxState {
    theme: ThemeName;
}

export interface Sale extends Record {
    first_name: string;
    last_name: string;
    email: string;
}

export interface Company extends Record {
    name: string;
    logo: string;
    sector: string;
    size: 1 | 10 | 50 | 250 | 500;
    linkedIn: string;
    website: string;
    phone_number: string;
    address: string;
    zipcode: string;
    city: string;
    stateAbbr: string;
    sales_id: Identifier;
    created_at: string;
    nb_contacts: number;
    nb_deals: number;
    nb_notes: number;
    nb_customers: number;
    country_iso: string;
    tags: Identifier[];
}

export interface CompanyNote extends Record {
    contact_id: Identifier;
    type: string;
    text: string;
    date: string;
    sales_id: Identifier;
}

export interface Contact extends Record {
    first_name: string;
    last_name: string;
    title: string;
    company_id: Identifier;
    email: string;
    avatar?: string;
    first_seen: string;
    last_seen: string;
    has_newsletter: Boolean;
    tags: Identifier[];
    gender: string;
    sales_id: Identifier;
    nb_notes: number;
}

export interface ContactNote extends Record {
    contact_id: Identifier;
    type: string;
    text: string;
    date: string;
    sales_id: Identifier;
    status: string;
}

export interface Deal extends Record {
    name: string;
    company_id: Identifier;
    contact_ids: Identifier[];
    type: string;
    stage: string;
    description: string;
    amount: number;
    created_at: string;
    updated_at: string;
    sales_id: Identifier;
    index: number;
    nb_notes: number;
}

export interface Tag extends Record {
    name: string;
    color: string;
}

export interface Country extends Record {
    iso: string;
    name: string;
    nicename: string;
    iso3: string;
    numcode: number;
    phonecode: number;
    url: string;
    nb_companies: number;
}

export interface Product extends Record {
    company_id: Identifier;
    family_id: Identifier;
    model: string;
    code: string;
    website: string;
    image: string;
    description: string;
    nb_properties: number;
}

export interface ProductFamily extends Record {
    category_id: Identifier;
    name: string;
    website: string;
    image: string;
    description: string;
    nb_products: number;
}

export interface FamilyCategory extends Record {
    name: string;
    website: string;
    image: string;
    description: string;
    nb_families: number;
}