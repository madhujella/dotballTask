import React, { useState, useEffect } from 'react';

const Excluded = ({ getData }) => {

    const [nameList, setNameList] = useState([''])

    useEffect(() => {
        getData([...nameList])
    }, [nameList])

    const onNameChange = ({ target }) => {
        const { name, value } = target
        const index = parseInt(name.split('~')[1])
        let updatedObj = []
        if (index === nameList.length - 1) {
            updatedObj = [...nameList.map((n, i) => i === index ? value : n), '']
        } else if (index === nameList.length - 2 && !value) {
            updatedObj = [...nameList.slice(0, nameList.length - 1)]
        } else {
            updatedObj = [...nameList.map((n, i) => i === index ? value : n)]
        }
        setNameList(updatedObj)
    }

    return (
        <div className="col">
            <div className="header">
                <span>Excluded</span>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        nameList.map((n, i) =>
                            <tr key={i}>
                                <td>
                                    <input type="text" className="form-input" placeholder="Name" name={`name~${i}`} onChange={onNameChange} />
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Excluded;