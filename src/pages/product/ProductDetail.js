import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Product from "./Product";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
// no CSS

const ProductDetail = () => {
    const { product_id } = useParams();
    const [productDetail, setProductDetail] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: product }] = await Promise.all([
                    axiosReq.get(`/product/${product_id}`)
                ]);
                setProductDetail({ results: [product] });
            } catch(err) {
                console.log(err)
            };
        };
        handleMount();
    }, [product_id]);

    return(
        <div>
            <Product {...productDetail.results[0]} setProductDetail={setProductDetail} ProductDetail/>
        </div>
    );
};

export default ProductDetail;
