function Forecast() {
  return (
    <ul className="list bg-base-100 rounded-box">
      <li className="list-row mx-auto gap-60">
        <div className="flex items-center gap-4">
          <div>
            <img
              className="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/1@94.webp"
            />
          </div>
          <div>
            <div>Dio Lupa</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              Remaining Reason
            </div>
          </div>
        </div>

        <div className="text-2xl">20 / 30</div>
      </li>
    </ul>
  );
}
export default Forecast;
