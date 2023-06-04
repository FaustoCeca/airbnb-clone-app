type SafeUser = Omit<User, 
'createdAt' | 'updatedAt' | 'emailVerified' & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
}
>;

type CountrySelectValue = {
    flag: string;
    label: string;
    latlng: number[];
    region: string;
    value: string;
}