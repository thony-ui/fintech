import ResponsiveAppBar from "../../components/NavbarWithoutSearchBar";
import Footer from "../../components/Footer";
import SuccessfulTransaction from "../../components/SuccessfulTransaction";

const successfulTransaction = () => {
    return (
        <>
            <ResponsiveAppBar />
            <SuccessfulTransaction />
            <Footer />
        </>
    )
}

export default successfulTransaction