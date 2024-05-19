import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="text-xs text-center py-3 text-slate-900 dark:text-white ">Made with ❤️ by {" "}
            <Link className="hover:underline" target="_blank" to="https://github.com/srkanyalcinkaya/">srkanyalcinkaya</Link>
        </div>
    )
}