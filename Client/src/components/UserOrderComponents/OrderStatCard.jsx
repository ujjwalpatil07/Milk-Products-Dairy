import PropTypes from "prop-types";

export default function OrderStatCard({ title, count, color, icon }) {
    return (
        <div className={`flex items-center gap-3 p-4 shadow-sm text-white ${color} w-60 sm:w-auto`}>
            <div className="text-2xl">{icon}</div>
            <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="text-lg font-bold">{count}</p>
            </div>
        </div>
    )
}

OrderStatCard.propTypes = {
    title: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
}