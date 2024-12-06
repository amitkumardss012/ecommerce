import BestProduct from "../../components/user/BestProduct";
import ImageSlider from "../../components/user/ImageSlider";
import { PG } from "../../constant/constant";

const Home = () => {
    return (
        <div>
            <ImageSlider />
            <BestProduct />
            {/* {PG} */}
        </div>
    )
}

export default Home;