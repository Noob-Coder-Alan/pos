import { Resolver, Query, Arg, Mutation, Authorized, Ctx } from "type-graphql";
import { Any } from "typeorm";
import { ChangeProductDetailsInput } from "../inputs/ChangeProductDetailsInput";
import { Product } from "../models/Product";
import { User } from "../models/User";
import { Context } from "../types/context";
require('dotenv').config()

@Resolver(of => Product)
export class ProductResolver {
    @Authorized()
    @Mutation(() => Number, { nullable: true })

    async addProduct(@Ctx() ctx: Context, @Arg("productname") productname: string, @Arg("description") description: string, @Arg("taxable") taxable: boolean, @Arg("photolink") photolink: String) {
        const user = await User.findOne({id: ctx.currentUser.id});
        let productId;

        

        await Product.create({
            productname,
            description,
            user: user,
            taxable,
            photolink:`${photolink}`
        }).save().then(value => productId = value.id)

      return productId;
    }

    @Authorized()
    @Mutation(() => Boolean, { nullable: true })
    async deleteProduct(@Ctx() ctx: Context, @Arg("productId") productId: number) {
        const product = await Product.findOne({ where: { user: ctx.currentUser.id, id: productId }, relations: ["user"]  });
        if (!product) throw new Error("Deletion not possible! Product doesn't exist!")
        await product.remove()
        return true;
    }

    @Authorized()
    @Mutation(() => Boolean)
    async changeProductDetails(@Ctx() ctx: Context, @Arg("productId") productId: number, @Arg("data") data: ChangeProductDetailsInput) {
        const product = await Product.findOne({ where: { id: productId, user: ctx.currentUser.id } });
        if (!product) throw new Error("Can't update a non existent product!");
        Object.assign(product, data);
        await product.save();
        return true;
    }

    @Authorized()
    @Query(() => [Product], { nullable: true })
    async getProducts(@Ctx() ctx: Context) {
        const products = await Product.find({ where: { user: ctx.currentUser.id } });
        return products;
    }

    @Authorized()
    @Query(() => Product, { nullable: true })
    async getProductDetails(@Ctx() ctx: Context, @Arg("productId") productId: number) {
        const user = await User.findOne({id: ctx.currentUser.id});
        const productDetails = await Product.findOne({ where: { user: user, id: productId } });
        if (!productDetails) throw new Error("Product doesn't exist!");

        console.log(productDetails)
        return productDetails;
    }
}