import { useTranslation } from 'react-i18next';
import { Button } from './Button';
import {
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight,
} from './icons';

interface TableFooterProps {
    page: number;
    totalPages: number;
    onPage: (page: number) => void;
    perPage: number;
    onPerPage: (n: number) => void;
    total: number;
}

export const TableFooter = ({
    page,
    totalPages,
    onPage,
    perPage,
    onPerPage,
    total,
}: TableFooterProps) => {
    const { t } = useTranslation();
    return (
        <div className="table-footer">
            <div>
                {t('table.showing')}{' '}
                <span className="table-footer-strong">{total}</span>{' '}
                {total === 1 ? t('table.result') : t('table.results')}
            </div>
            <div className="table-footer-right">
                <div className="per-page">
                    <span>{t('table.perPage')}</span>
                    <select
                        value={perPage}
                        onChange={(e) => onPerPage(Number(e.target.value))}
                        className="input per-page-select"
                    >
                        {[10, 15, 25, 50].map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="pager">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onPage(1)}
                        disabled={page <= 1}
                    >
                        <IconChevronsLeft size={14} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onPage(page - 1)}
                        disabled={page <= 1}
                    >
                        <IconChevronLeft size={14} />
                    </Button>
                    <span className="pager-pos">
                        <span className="pager-current">{page}</span>{' '}
                        {t('table.of')} {totalPages}
                    </span>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onPage(page + 1)}
                        disabled={page >= totalPages}
                    >
                        <IconChevronRight size={14} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onPage(totalPages)}
                        disabled={page >= totalPages}
                    >
                        <IconChevronsRight size={14} />
                    </Button>
                </div>
            </div>
        </div>
    );
};
