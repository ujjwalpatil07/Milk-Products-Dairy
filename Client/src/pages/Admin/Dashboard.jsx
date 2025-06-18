import SalesOverview from "../../components/AdminComponents/DashboardComponents/SalesOverview";

export default function Dashboard() {


    return (
        <>
            <section className="p-3">
                <SalesOverview />
            </section>

            <section>
                Inventory Summary
            </section>
        </>
    )
}