import './table.scss';
import React, {useMemo, useState} from 'react';
import Pagination from './pagination/pagination.tsx';

export default function Table({data, config}: any) {
    const [sortConfig, setSortConfig] = useState(
        {key: 'lastName', direction: 'asc'}); // gère la config de tri
    const [rowsPerPage, setRowsPerPage] = useState(10); // gère la config de pagination
    const [currentPage, setCurrentPage] = useState(1); // récupère la page courante



    /**
     * Fonction qui trie les données en fonction de la clé et de la direction
     * utilise useMemo pour éviter de recalculer à chaque rendu
     */
    const sortedData = useMemo(() => {
        // prend une copie des valeurs pour ne pas modifier les données originales et les trie pour le renvoyer dans le bon sens
        return [...data].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        })
    }, [data, sortConfig]);

    /**
     * Fonction qui gère le tri des données
     * @param key
     */
    const handleSort = (key: string) => {
        let direction = 'asc'; //je défini la direction sur asc par défaut
        if (sortConfig.key === key && sortConfig.direction === 'asc') { //si la clé est la même,
            direction = 'desc'; // c'est que j'ai changé la direction de asc vers desc donc je change la direction
        }
        setSortConfig({key, direction}); // j'applique les modif de la key sur le state et sur le tri si il y a besoin sinon je laisse en asc
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(Number(event.target.value)); // modif le state avec le nouveau nombre de lignes par page
        setCurrentPage(1); // remet la page courante à 1 si je modifie la nombre de lignes par page
    };

    // slice data pour renvoyer que les bonnes lignes
    // indice de départ : on part de la current page (- 1 car on commence à l'index 0) et on multiplie par le nombre de ligne a afficher
    // indice de fin : meme calcul mais sans le -1
    const paginatedData = sortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th onClick={() => handleSort('id')}>
                        ID {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                    </th>
                    <th onClick={() => handleSort('firstName')}>
                        Name {sortConfig.key === 'firstName' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                    </th>
                    <th onClick={() => handleSort('lastName')}>
                        Value {sortConfig.key === 'lastName' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                    </th>
                </tr>
                </thead>
                <tbody>
                {paginatedData.map((item: any, index) => (
                   <tr key={index}>
                       <td key={index}>{item[index]}</td>
                   </tr>
                ))}
                </tbody>
            </table>
            <div>
                <label>
                    Rows per page:
                    <input type="number" value={rowsPerPage} onChange={handleChangeRowsPerPage} min="1"/>
                </label>
            </div>
            <Pagination
                totalItems={sortedData.length}
                rowsPerPage={rowsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
