
export default function AddIcon({ fillColor }: any) {
    return (
        <div>
            <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative flex-grow-0 flex-shrink-0 w-5 h-5"
                preserveAspectRatio="xMidYMid meet"
            >
                <path
                    d="M18.5711 9.28538H10.7136V1.42871H9.28523V9.28538H1.42773V10.7145H9.28523V18.5712H10.7136V10.7145H18.5711V9.28538Z"
                    fill={fillColor}
                />
            </svg>
        </div>
    )
}
