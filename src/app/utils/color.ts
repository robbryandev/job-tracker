import colors from "tailwindcss/colors";

export const statusColor: Record<string, string> = {
    "applied": colors.blue["300"],
    "rejected": colors.red["400"],
    "interview": colors.purple["300"],
    "accepted": colors.green["500"]
}