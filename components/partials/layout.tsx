import Header from "./header/header";
import Footer from "./footer/footer";


function Layout({ children }: any) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Layout;