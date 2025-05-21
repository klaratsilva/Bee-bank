import { Button, DatePicker, InputNumber, Space } from "antd";
import dayjs from "dayjs";

interface TransactionFilterProps {
  filters: Record<string, string>;
  onChangeFilters: (filters: Record<string, string | null>) => void;
}

const TransactionFilter: React.FC<TransactionFilterProps> = ({
  filters = {},
  onChangeFilters,
}) => {
  const filterDate = filters.filterDate || null;
  const filterAmount = filters.filterAmount || null;

  const handleClear = () => {
    onChangeFilters({ filterDate: null, filterAmount: null });
  };

  return (
    <Space style={{ marginBottom: 16 }} wrap>
      <DatePicker
        value={filterDate ? dayjs(filterDate) : null}
        onChange={(date) =>
          onChangeFilters({
            filterDate: date ? dayjs(date).format("YYYY-MM-DD") : null,
          })
        }
        placeholder="Filter by Date"
      />
      <InputNumber
        min={0}
        placeholder="Amount"
        value={filterAmount ? Number(filterAmount) : undefined}
        onChange={(val) =>
          onChangeFilters({ filterAmount: val !== null ? String(val) : null })
        }
      />
      <Button onClick={handleClear}>Clear Filters</Button>
    </Space>
  );
};

export default TransactionFilter;
