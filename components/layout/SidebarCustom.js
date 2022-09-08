import { Sidebar } from 'flowbite-react';

const SidebarCustom = (props) => {
  const { groups } = props;

  return (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href='/'>Dashboard</Sidebar.Item>
          <Sidebar.Collapse label='Groups'>
            {groups?.map((group) => (
              <Sidebar.Item href={`/groups/${group._id}`} key={group._id}>
                {group.name}
              </Sidebar.Item>
            ))}
          </Sidebar.Collapse>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SidebarCustom;
