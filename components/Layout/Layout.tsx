// import breakPoints from '../helpers/breakPoints';
import {Header} from "../Header/Header";

export function Layout({children}:{children:any}) {

    // const screen = breakPoints();
    // const isMobile = screen === 'desktop';

    return (
            <main >
                {children}
            </main>
    );
}
