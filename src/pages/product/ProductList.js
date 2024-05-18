import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Product from "./Product";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ProductList = () => {
    const { user_id } = useParams();
    const [productList, setProductList] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const { data } = await axiosReq.get(`/product/?owner__userauthentication=${user_id}`);
                setProductList(data);
                setHasLoaded(true);
            } catch(err) {
                console.log(err)
            };
        };
        fetchProductList();
        console.log(user_id);
    }, [user_id]);
    
    return(
        <div>
            {hasLoaded ? (<>
            {productList.results.length ? (<>
                <InfiniteScroll
                children={productList.results.map((product) => (
                    <div>
                        <Product key={product.product_id} {...product} setProductList={setProductList} />
                    </div>
                ))}
                dataLength={productList.results.length}
                loader={<p>loading...</p>}
                hasMore={!!productList.next}
                next={() => fetchMoreData(productList, setProductList)}
                />
            </>) : (<>
                <p>No results</p>
            </>)}
            </>) : (<>
            <p>Not loaded</p>
            </>)}
        </div>
    );
};

export default ProductList;