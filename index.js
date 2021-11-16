function diagram (a, b) {
    const getOffset = () => 100 - (a) + 25

    const getDiff = val => 100 - val
    console.log(getOffset())
    let sup = 0.2

    const translocation = val => {
        let offset = 0;
        if (val > 0 && val <= 4 || val >= 49 && val <= 51) {
            offset = 0.2
        }
        else if (val > 4 && val <= 6 || val >= 46 && val <= 48) {
            offset = 0.4
        }
        else if (val > 7 && val <= 9 || val >= 42 && val <= 45) {
            offset = 0.6
        }
        else if (val > 9 && val <= 12 || val >= 38 && val <= 41) {
            offset = 0.8
        }else if (val > 12 && val <= 16 ) {
            offset = 0.9
        }
        else if (val > 16 && val <= 19 || val === 37) {
            offset = 1
        }
        else if (val > 19 && val <= 36) {
            offset = 1.2
        }
        else if (val > 52 && val <= 55 || val >= 98 && val <= 100){
           offset = 0
        }
        else if (val > 55 && val <= 60 || val >= 94 && val <= 97){
            offset = -0.2
        }
        else if (val === 61 || val >= 88 && val <= 93){
            offset = -0.4
        }
        else if (val > 62 && val <= 66 || val >= 86 && val <= 87){
            offset = -0.6
        }
        else if (val > 67 && val <= 85){
            offset =  -0.8
        }
        console.log(offset)
        return offset
    }
    
    return `
        <svg width="100%" height="100%" viewBox="0 0 42 42" class="donut">
            <circle class="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
            <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#2BD6FB" stroke-width="5" stroke-dasharray="${a + translocation(a)} ${getDiff(a + translocation(a))}" stroke-dashoffset="25"></circle>
            <circle class="donut-segment" cx="21" cy="22" r="15.91549430918954" fill="transparent" stroke="#217AFF" stroke-width="5" stroke-dasharray="${b} ${getDiff(b)}" stroke-dashoffset="${getOffset()}"></circle>
        </svg>
    `
}

document.querySelector('.out').innerHTML = diagram(20, 80);