import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status as Status)
    ? { status: searchParams.status }
    : undefined;
  const where = status;

  const orderByFilter =
    searchParams.orderBy && columnNames.includes(searchParams.orderBy)
      ? { [searchParams.orderBy]: "asc" }
      : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy: orderByFilter,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const itemCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="4">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={itemCount}
        currentPage={page}
        pageSize={pageSize}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
