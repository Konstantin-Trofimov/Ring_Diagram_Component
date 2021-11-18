const financeData = {
    date: '15.01.2021',
    total: 600000000,
    budgetResources: 1092045473,
    otherResources: 1572394226,
    wageFund: 2664439699,
    landTax: 65185520,
    propertyTax: 45229727
}


const convertFinanceData = [
    {
        title: 'Из средств бюджета',
        value: 1092045473
    },
    {
        title: 'Из средств от иной приносящей доход деятельности',
        value: 1572394226
    },
    {
        title: 'Фондоплатытруда',
        value: 2664439699
    },
    {
        title: 'Земельный налог',
        value: 165185520
    },
    {
        title: 'Имущественный налог',
        value: 45229727
    },
    
]
wageFundDiagramData = convertFinanceData.slice(0, 2);
сostsDiagramData = convertFinanceData.slice(2, 5).reverse();


const getArray = data => data.map(i => i.value);

class Diagram  {
    constructor (title, data, colors, parentSelector, isDecorated = false) {
        this.parentSelector = document.querySelector(`.${ parentSelector }`),
        this.segmentColors  = colors,
        this.isDecorated    = isDecorated,
        this.title          = title,
        this.data           = data,
        this.fill           = '#112054',
        this.diff(),
        this.offset(),
        this.sector(),
        this.insDiagramSectors(),
        this.diagrammSegmentConfig()
    }

    get diagramValues () { 
        const values = this.data.map(i => i.value);
        const sumValues = values.reduce((a, b) => a + b);

        let array = values.map(i => Math.round( i / sumValues * 100));
        let max = Math.max(...array);
       
        if (this.isDecorated) {
            array = array.map(i => i < 5 ? i + 10 : i)
        }

        const sumRatio = array.reduce((a, b) => a + b);
        const diff = sumRatio - 100;

        return array.map(i => i === max ? i - diff : i);
    }

    get internalEclipseColor () { return this.segmentColors[this.segmentColors.length - 1] }

    diff (val) { return 100 - val }

    offset (index) { 
        const start = 25;
        let location = 0;
        let sum = 0;
      
        this.diagramValues.map((_, i, array) => {
            if (i == index && i !== 0) {
                for (let j = 0; j < i; j++) {
                    sum += array[j];
                }
                sum = 100 - sum;
               
            }
        })    
        location = start + sum;
       
        return location;  
    }

    diagrammSegmentConfig (r = 15.91549430918954) { return `class="donut-segment" cx="21" cy="21" r="${r}"` }

    sector (item, index) { 
        const strokeWidth = index == 0 ? 10 : index == this.diagramValues.length - 1 ? 5 : 7; 
        return `<circle  ${this.diagrammSegmentConfig()} fill="${this.fill}" stroke="${this.segmentColors[index]}" stroke-width="${strokeWidth}" stroke-dasharray="${item} ${this.diff(item)}" stroke-dashoffset="${this.offset(index)}"></circle>`; 
    }

    insDiagramSectors() { return this.diagramValues.map((i, index) => this.sector(i, index)).join('') }
  

    render () { 
        const diagram = document.createElement('div');
        diagram.classList.add('diagram');
        diagram.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 42 42" class="donut">
                ${this.insDiagramSectors()}
                <circle ${this.diagrammSegmentConfig(12)} fill="${this.fill}" stroke="${this.internalEclipseColor}" stroke-width="0.3"></circle>
            </svg>

            <div class="text">${this.title}</div>
        `;
        
        this.parentSelector.append(diagram);
    }
}

new Diagram('Фонд оплаты труда', wageFundDiagramData, ['#2BD6FB', '#217AFF'], 'out', ).render()
new Diagram('Затраты', сostsDiagramData, ['#FFC01D',  '#FB9B2B', '#FD6A6A'], 'out2', true).render()
