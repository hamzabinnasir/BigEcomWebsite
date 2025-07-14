import assets from "../../assets/assetsFile.js"
const navListData = [
    {
        _id: 1,
        title: "women",
    },
    {
        _id: 2,
        title: "men",
    },
    {
        _id: 3,
        title: "company",
    },
    {
        _id: 4,
        title: "stores",
    }
];



const womenData = [
    {
        _id: 1,
        img: assets.girlsImg,
        title: "new arrivals",
    },
    {
        _id: 2,
        img: assets.clothesImg,
        title: "basic tees"
    }
];

const menData = [
    {
        _id: 1,
        img: assets.menTshirt1,
        title: "new arrivals",
    },
    {
        _id: 2,
        img: assets.menTshirt2,
        title: "artwork tees"
    }
];

const companyData = [
    {
        _id: 1,
        img: assets.girlsImg,
        title: "Company 1",
    },
    {
        _id: 2,
        img: assets.clothesImg,
        title: "Company 2"
    }
];

const storesData = [
    {
        _id: 1,
        img: assets.girlsImg,
        title: "stores 1",
    },
    {
        _id: 2,
        img: assets.clothesImg,
        title: "stores 2"
    }
];

const navBottomListData = [
    {
        _id: 1,
        topLevelCategory: "women",
        listItemsContainer: [
            {
                _id: 1,
                secondLevelCategory: "clothing",
                listItems: [
                    "tops",
                    "dress",
                    "women jeans",
                    "lengha choli",
                    "sweaters",
                    "T-Shirts",
                    "jackets",
                    "gouns",
                    "sarees",
                    "kurtas",
                ],
                values: [
                    "tops",
                    "dress",
                    "womenJeans",
                    "lenghaCholi",
                    "sweaters",
                    "tShirts",
                    "jackets",
                    "gouns",
                    "sarees",
                    "kurtas",
                ]
            },
            {
                _id: 2,
                secondLevelCategory: "accessories",
                listItems: [
                    "watches",
                    "wallets",
                    "bags",
                    "sunglasses",
                    "hats",
                    "belts",
                ],
                values: [
                    "watches",
                    "wallets",
                    "bags",
                    "sunglasses",
                    "hats",
                    "belts",
                ]
            },
            {
                _id: 3,
                secondLevelCategory: "brands",
                listItems: [
                    "Re-Arranged",
                    "counterfeit",
                    "full nelson",
                    "sunglasses",
                    "my way",
                ],
                values: [
                    "reArranged",
                    "counterfeit",
                    "fullNelson",
                    "sunglasses",
                    "myWay",
                ]
            },
        ],
    },
    {
        _id: 2,
        topLevelCategory: "men",
        listItemsContainer: [
            {
                _id: 1,
                secondLevelCategory: "clothing",
                listItems: [
                    "mens kurtas",
                    "shirt",
                    "men jeans",
                    "sweaters",
                    "T-Shirts",
                    "jackets",
                    "activewears",
                ],
                values: [
                    "kurtas",
                    "shirt",
                    "menJeans",
                    "sweaters",
                    "tShirts",
                    "jackets",
                    "activewears",
                ]
            },
            {
                _id: 2,
                secondLevelCategory: "accessories",
                listItems: [
                    "watches",
                    "wallets",
                    "bags",
                    "sunglasses",
                    "hats",
                    "belts",
                ],
                values: [
                    "watches",
                    "wallets",
                    "bags",
                    "sunglasses",
                    "hats",
                    "belts",
                ]
            },
            {
                _id: 3,
                secondLevelCategory: "brands",
                listItems: [
                    "Re-Arranged",
                    "counterfeit",
                    "full nelson",
                    "sunglasses",
                    "my way",
                ],
                values: [
                    "reArranged",
                    "counterfeit",
                    "fullNelson",
                    "sunglasses",
                    "myWay",
                ]
            },
        ],
    },
    {
        _id: 3,
        topLevelCategory: "kids",
        listItemsContainer: [
            {
                _id: 1,
                secondLevelCategory: "clothing",
                listItems: [
                    "T-Shirts",
                    "jeans",
                    "dress",
                    "sunglasses",
                    "hoodies",
                ],
                values: [
                    "tShirts",
                    "jeans",
                    "dress",
                    "sunglasses",
                    "hoodies",
                ]
            },
            {
                _id: 2,
                secondLevelCategory: "accessories",
                listItems: [
                    "watches",
                    "watches",
                    "belts",
                    "bags",
                    "wallets",
                ],
                values: [
                    "watches",
                    "watches",
                    "belts",
                    "bags",
                    "wallets",
                ]
            },
            {
                _id: 3,
                secondLevelCategory: "brands",
                listItems: [
                    "nike",
                    "addidas",
                    "zara",
                    "h&m",
                    "gucci",
                ],
                values: [
                    "nike",
                    "addidas",
                    "zara",
                    "hAndM",
                    "gucci",
                ]
            },
        ],
    },
];


export { womenData, menData, companyData, storesData, navListData, navBottomListData };