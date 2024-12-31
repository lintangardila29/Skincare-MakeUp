export interface Brand {
    // columns
    id: number;
    name: string;
    logo: string | null;
    website: string | null;
    description: string | null;
    created_at: Date;
    updated_at: Date;
    // relations
    products: Product[];
}

export interface Category {
    // columns
    id: number;
    name: string;
    description: string | null;
    created_at: Date;
    updated_at: Date;
    // relations
    products: Product[];
}

export interface Product {
    // columns
    id: number;
    brand_id: number | null;
    category_id: number | null;
    name: string;
    description: string | null;
    price: number;
    image: string | null;
    ctaLink: string | null;
    created_at: Date;
    updated_at: Date;
    // relations
    brand: Brand;
    category: Category;
}

export interface Review {
    // columns
    id: number;
    product_id: number;
    user_id: number;
    rating: number;
    comment: string | null;
    created_at: Date;
    updated_at: Date;
    // relations
    product: Product;
    user: User;
}

export interface Role {
    // columns
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    // relations
    users: User[];
}

export interface User {
    // columns
    id: number;
    role_id: number;
    name: string;
    avatar: string | null;
    email: string;
    email_verified_at: string | null;
    password?: string;
    remember_token?: string | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    // relations
    role: Role;
    product: Product;
    reviews: Review[];
    notifications: DatabaseNotification[];
}
