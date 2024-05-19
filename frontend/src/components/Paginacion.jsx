import { useEffect, useState } from "react";
import "../styles/paginacion.css";

export const Paginacion = ({ currentPage, totalPages, onPageChange }) => {
    // Calculate the range of pages to display
    const range = [];
    for (let i = 1; i <= totalPages; i++) {
        range.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {/* Render the previous page button */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        «
                    </button>
                </li>

                {/* Render the page numbers */}
                {range.map((page) => (
                    <li
                        key={page}
                        className={`page-item ${currentPage === page ? 'active' : ''}`}
                    >
                        <button
                            className="page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}

                {/* Render the next page button */}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        »
                    </button>
                </li>
            </ul>
        </nav>
    );
};