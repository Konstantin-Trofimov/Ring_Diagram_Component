



function diagram (a, b) {



    const getOffset = () => 100 - (a) + 25 

    const getDiff = val => 100 - val
    
    return `
    <div class="diagram">
        <svg width="100%" height="100%" viewBox="0 0 42 42" class="donut">
            <circle class="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>

            
            <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="#112054" stroke="#2BD6FB" stroke-width="10" stroke-dasharray="${a} ${getDiff(a)}" stroke-dashoffset="25"></circle>
            <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="#112054" stroke="#217AFF" stroke-width="5" stroke-dasharray="${b} ${getDiff(b)}" stroke-dashoffset="${getOffset()}"></circle>
            
            <circle class="donut-segment" cx="21" cy="21" r="12" fill="#112054" stroke="#2BD6FB" stroke-width="0.3"  stroke-dashoffset="25"></circle>

            
        </svg>

        <div class="text">Фонд оплаты труда</div>
    </div>
    `
}

// document.querySelector('.out').innerHTML = diagram(35, 65);

class Diagram  {
    constructor(title, data, colors, parentSelector, internalEclipseColor = '#FFFF') {
        this.parentSelector = document.querySelector(`.${parentSelector}`) ,
        this.data = data,
        this.segmentColors = colors,
        this.internalEclipseColor = internalEclipseColor,
        this.title = title
        this.offsets = []
        this.diff()
    }

    get offset () { return 100 - (this.data[0]) + 25 }

    diff (val) { return 100 - val }

    render() {
        const diagram = document.createElement('div')
        diagram.classList.add('diagram')
        diagram.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 42 42" class="donut">
                <circle class="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
                <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="#112054" stroke="${this.segmentColors[0]}" stroke-width="10" stroke-dasharray="${this.data[0]} ${this.diff(this.data[0])}" stroke-dashoffset="25"></circle>
                <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="#112054" stroke="${this.segmentColors[1]}" stroke-width="5" stroke-dasharray="${this.data[1]} ${this.diff(this.data[1])}" stroke-dashoffset="${this.offset}"></circle>
                <circle class="donut-segment" cx="21" cy="21" r="12" fill="#112054" stroke="${this.internalEclipseColor}" stroke-width="0.3"  stroke-dashoffset="25"></circle>
            </svg>

        <div class="text">${this.title}</div>
        `
        console.log(this.offset)
        this.parentSelector.append(diagram)
    
    }

}

new Diagram('Фонд оплаты труда', [10, 90], ['#2BD6FB', '#217AFF', '#000'], 'out', '#2BD6FB').render()