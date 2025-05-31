export default function Layout({ children }) {

    return (
        <>
        {/* navbar */}
        <main className="flex-1">
            { children }
        </main>
        {/* footer */}
        </>
    )
}