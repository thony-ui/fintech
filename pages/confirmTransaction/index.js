import ResponsiveAppBar from "../../components/NavbarWithoutSearchBar";
import Footer from "../../components/Footer";
import ConfirmTransaction from "../../components/ConfirmTransaction";

const confirmTransaction = () => {
    return (
        <>
            <ResponsiveAppBar />
            <ConfirmTransaction />
            <Footer />
        </>
    )
}

export default confirmTransaction