const DetailRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <tr className="border-b border-borders/60 last:border-0">
    <td className="py-3 pr-4 text-sm text-text-secondary whitespace-nowrap">{label}</td>
    <td className="py-3 text-sm text-text-primary">{value}</td>
  </tr>
);

export default DetailRow;