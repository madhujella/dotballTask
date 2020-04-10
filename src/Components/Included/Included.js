import React, { useState, useEffect } from 'react';

import './Included.css';

const defaultState = {
    name: '',
    domesticPrice: '',
    internationalPrice: '',
}

const Included = ({ getData }) => {

    const [priceList, setPriceList] = useState([{ ...defaultState }])

    const [totalDomesticPrice, setTotalDomesticPrice] = useState(0)
    const [totalInternationalPrice, setTotalInternationalPrice] = useState(0)

    useEffect(() => {
        if (priceList && priceList.length) {
            let domesticPrice = 0
            let internationalPrice = 0
            priceList.forEach(p => {
                domesticPrice += parseInt(p.domesticPrice) || 0
                internationalPrice += parseInt(p.internationalPrice) || 0
            })
            setTotalDomesticPrice(domesticPrice)
            setTotalInternationalPrice(internationalPrice)
            getData([...priceList])
        }
    }, [priceList])

    const onChange = ({ target }) => {
        const { name, value } = target
        const [key, getIndex] = name.split('~')
        const index = parseInt(getIndex)
        let updatedObj = []
        if (index === priceList.length - 1 && key === 'name') {
            updatedObj = [...priceList.map((p, i) => i === index ? ({ ...p, [key]: value }) : p), defaultState]
        } else if (index === priceList.length - 2 && key === 'name' && !value) {
            updatedObj = [...priceList.slice(0, priceList.length - 1)]
        } else {
            updatedObj = priceList.map((p, i) => i === index ? ({ ...p, [key]: value }) : p)
        }
        setPriceList(updatedObj)
    }

    return (
        <div className="col">
            <div className="header">
                <span className="tag">Included</span>
                <span className="tag-time">{new Date().toISOString()}</span>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>AMOUNT - DOMESTIC</th>
                        <th>AMOUNT - INTERNATIONAL</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        priceList && priceList.length
                            ? priceList.map((d, i) =>
                                <tr key={i}>
                                    <td>
                                        <input type="text" className="form-input" placeholder="Name" value={priceList.name}
                                            onChange={onChange} name={`name~${i}`} />
                                    </td>
                                    <td>
                                        <div className="input-group">
                                            <span className="input-group-text">Rs.</span>
                                            <input type="number" className="form-input" placeholder="Amount" value={priceList.domesticPrice}
                                                onChange={onChange} name={`domesticPrice~${i}`} />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="input-group">
                                            <span className="input-group-text">$</span>
                                            <input type="number" className="form-input" placeholder="Amount" value={priceList.internationalPrice}
                                                onChange={onChange} name={`internationalPrice~${i}`} />
                                        </div>
                                    </td>
                                </tr>)
                            : null
                    }
                    <tr className="result-row">
                        <td>
                            <span>Total</span>
                        </td>
                        <td>
                            <span>Rs. {totalDomesticPrice} (Estimate)</span>
                        </td>
                        <td>
                            <span>$ {totalInternationalPrice} (Estimate)</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Included;