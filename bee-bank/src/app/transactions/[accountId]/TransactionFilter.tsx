import { DatePicker, InputNumber, Button, Space } from 'antd';
import dayjs from 'dayjs';

interface TransactionFilterProps {
  setFilterDate: (date: string | null) => void;
  setFilterAmount: (amount: number | null) => void;
}

const TransactionFilter: React.FC<TransactionFilterProps> = ({
  setFilterDate,
  setFilterAmount,
}) => {
  return (
    <Space style={{ marginBottom: 16 }} wrap>
      <DatePicker
        onChange={(date) => setFilterDate(date ? dayjs(date).format('YYYY-MM-DD') : null)}
        placeholder="Filter by Date"
      />
      <InputNumber
        min={0}
        placeholder="Amount"
        onChange={(val) => setFilterAmount(val)}
      />
      <Button onClick={() => { setFilterDate(null); setFilterAmount(null); }}>
        Clear Filters
      </Button>
    </Space>
  );
};

export default TransactionFilter;