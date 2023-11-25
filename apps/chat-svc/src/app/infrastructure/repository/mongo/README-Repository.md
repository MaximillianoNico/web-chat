
Biding Product
endpoint /bid/{{productId}} -> check the user deposit before making a transaction   -> update user history purchase
                                                                                    -> update product detail, with current bid  -> emit to `bid::{{productId}}`


Deposito
endpoint /user/deposito -> update wallet


User
{
    id: "",
    email: "",
    password: "",
    createAt: "",
    deposit: Number
}

Product
{
    id: "",
    owner: "User.id",
    name: "",
    lastTimeAuction: Date,
    createAt: Date,
    startAuction: Date,
    price: "",
    isActive: Boolean
}

Transactions
{
    userId: "User.id",
    productId: "Product.id",
    bid: Number
}
