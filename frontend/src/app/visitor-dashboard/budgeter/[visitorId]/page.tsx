"use client"
import { useQuery } from '@apollo/client';
import { GET_BUDGET_TOOL } from '@/graphql/queries';
import { useParams } from 'next/navigation';
import BudgetHeader from '@/components/visitor-dashboard/budgeter/BudgetHeader';
import TotalCost from '@/components/visitor-dashboard/budgeter/TotalCost';
import AmountPaid from '@/components/visitor-dashboard/budgeter/AmountPaid';
import BudgetItemsPanel from '@/components/visitor-dashboard/budgeter/BudgetItemsPanel';
import CreateBudgetTool from '@/components/visitor-dashboard/budgeter/CreateBudgetTool';
import { BudgetItemData } from '@/types/budgeterTypes';

const BudgeterPage = () => {
  const { visitorId } = useParams() as { visitorId: string };


  const { data, loading, error } = useQuery(GET_BUDGET_TOOL, {
    variables: { visitorId },
    skip: !visitorId,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const budgetTool = data?.budgetTool;
  const budgetToolId: string = data?.budgetTool?.id;

  if (budgetToolId == null) {
    return <div className="p-6 max-w-[1064px] items-center">
      <CreateBudgetTool visitorId={visitorId}/>
    </div>;
  }

  const totalCost = budgetTool.budgetItems.reduce((sum:number, item: BudgetItemData) => sum + item.estimatedCost, 0);
  const amountPaid = budgetTool.budgetItems.reduce((sum:number, item: BudgetItemData) => sum + item.amountPaid, 0);

  return (
    <div className="p-6 max-w-[1064px] items-center">
      <BudgetHeader budget={budgetTool.totalBudget} totalCost={totalCost} />
      <div className="grid grid-cols-2 gap-[5px] py-[5px]">
        <TotalCost totalCost={totalCost} budget={budgetTool.totalBudget} />
        <AmountPaid amountPaid={amountPaid} totalCost={totalCost} />
      </div>
      <div>
        <BudgetItemsPanel budgetToolId={budgetToolId}/>
      </div>
    </div>
  );
};

export default BudgeterPage;