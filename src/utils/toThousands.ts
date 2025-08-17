function formatNumberToThousands(num: number): string {
    if (isNaN(num) || typeof num !== "number") {
        throw new Error("必须是一个有效数字");
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export default formatNumberToThousands