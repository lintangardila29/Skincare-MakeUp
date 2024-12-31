import { User } from "@/types/model";
import * as z from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
];

export const loginFormSchema = z.object({
    email: z.string().min(1, {
        message: "Email harus diisi",
    }),
    password: z.string().min(1, {
        message: "Password harus diisi",
    }),
    remember: z.boolean(),
});

export const registerFormSchema = z
    .object({
        name: z.string().min(1, {
            message: "Nama harus diisi",
        }),
        email: z.string().min(1, {
            message: "Email harus diisi",
        }),
        password: z.string().min(8, {
            message: "Password minimal 8 karakter",
        }),
        password_confirmation: z.string().min(1, {
            message: "Konfirmasi Password harus diisi",
        }),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Password tidak cocok",
        path: ["password_confirmation"],
    });

export const resetPasswordFormSchema = z.object({
    email: z.string().min(1, {
        message: "Email harus diisi",
    }),
});

export const brandFormSchema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().min(1, {
        message: "Nama harus diisi",
    }),
    logo: z
        .instanceof(File)
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 2MB.`)
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            "Only .jpg, .jpeg, .png, .webp and .gif formats are supported."
        )
        .nullable()
        .optional(),
    website: z.union(
        [
            z
                .string()
                .url({
                    message: "Link tidak valid",
                })
                .nullish(),
            z.literal(""),
        ],
        {
            invalid_type_error: "Link tidak valid",
            message: "Link tidak valid",
        }
    ),
    description: z.string().optional(),
});

export const categoryFormSchema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().min(1, {
        message: "Nama harus diisi",
    }),
    description: z.string().optional(),
});

export const institutionFormSchema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().min(1, {
        message: "Nama harus diisi",
    }),
});

export const userFormSchema = (defaultValues: User) => {
    return z.object({
        role_id: z.coerce.number().min(1, {
            message: "Role harus diisi",
        }),
        name: z.string().min(1, {
            message: "Nama harus diisi",
        }),
        email: z.string().min(1, {
            message: "Email harus diisi",
        }),
        password: defaultValues
            ? z.string().optional()
            : z.string().min(8, { message: "Password minimal 8 karakter" }),
        new_password: defaultValues
            ? z
                  .string()
                  .optional()
                  .refine((value) => !value || value.length >= 8, {
                      message: "Password baru harus minimal 8 karakter",
                  })
            : z.string().optional(),
        email_verified_at: z.date().nullable().optional(),
    });
};

export const productFormSchema = () => {
    return z.object({
        brand_id: z.coerce.number().min(1, {
            message: "Brand harus diisi",
        }),
        category_id: z.coerce.number().min(1, {
            message: "Kategori harus diisi",
        }),
        name: z.string().min(1, {
            message: "Nama harus diisi",
        }),
        description: z.string().min(1, {
            message: "Deskripsi harus diisi",
        }),
        price: z.coerce.number().min(1, {
            message: "Harga harus diisi",
        }),
        image: z
            .instanceof(File)
            .refine(
                (file) => file?.size <= MAX_FILE_SIZE,
                `Max image size is 2MB.`
            )
            .refine(
                (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
                "Only .jpg, .jpeg, .png, .webp and .gif formats are supported."
            )
            .nullable()
            .optional(),
        ctaLink: z.union(
            [
                z
                    .string()
                    .url({
                        message: "Link tidak valid",
                    })
                    .nullish(),
                z.literal(""),
            ],
            {
                invalid_type_error: "Link tidak valid",
                message: "Link tidak valid",
            }
        ),
    });
};

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type RegisterFormValues = z.infer<typeof registerFormSchema>;
export type ResetPasswordFormValues = z.infer<typeof registerFormSchema>;
export type BrandFormValues = z.infer<typeof brandFormSchema>;
export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
export type UserFormValues = z.infer<ReturnType<typeof userFormSchema>>;
export type ProductFormValues = z.infer<ReturnType<typeof productFormSchema>>;
export type InstitutionFormValues = z.infer<typeof institutionFormSchema>;
