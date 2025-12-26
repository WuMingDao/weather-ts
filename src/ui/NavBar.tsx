import { useLocation, useNavigate } from "react-router";

function NavBar() {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	return (
		<div className="navbar bg-base-100 shadow-sm">
			<div className="navbar-start">
				<div className="dropdown">
					<button
						type="button"
						tabIndex={0}
						className="btn btn-ghost lg:hidden"
					>
						<svg
							role="img"
							aria-label="Menu"
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<title>Menu</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</button>
					<ul
						tabIndex="-1"
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
					>
						<li>
							<button
								type="button"
								className={`btn ${
									pathname !== "/" ? "btn-ghost" : "pointer-events-none"
								}`}
								onClick={() => navigate("/")}
							>
								Home
							</button>
						</li>
						<li>
							<button
								type="button"
								className={`btn ${
									pathname !== "/forecast" ? "btn-ghost" : "pointer-events-none"
								}`}
								onClick={() => navigate("/forecast")}
							>
								Forecast
							</button>
						</li>
					</ul>
				</div>
				<button
					type="button"
					className="btn btn-ghost text-xl"
					onClick={() => navigate("/")}
				>
					Weather
				</button>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1 gap-4">
					<li>
						<button
							type="button"
							className={`btn ${
								pathname !== "/" ? "btn-ghost" : "pointer-events-none"
							}`}
							onClick={() => navigate("/")}
						>
							Home
						</button>
					</li>
					<li>
						<button
							type="button"
							className={`btn ${
								pathname !== "/forecast" ? "btn-ghost" : "pointer-events-none"
							}`}
							onClick={() => navigate("/forecast")}
						>
							Forecast
						</button>
					</li>
				</ul>
			</div>
			<div className="navbar-end"></div>
		</div>
	);
}
export default NavBar;
