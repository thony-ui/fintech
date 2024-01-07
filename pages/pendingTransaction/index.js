import ResponsiveAppBar from "../../components/NavbarWithoutSearchBar";
import Footer from "../../components/Footer";
import PendingTransaction from "../../components/PendingTransaction";

const pendingTransaction = () => {
    return (
        <>
            <ResponsiveAppBar />
            <PendingTransaction />
            <Footer />
        </>
    )
}

export default pendingTransaction