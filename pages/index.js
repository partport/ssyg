import axios from "axios";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import CardArtist from "../components/CardArtist";

const fetcher = (...args) => axios(...args).then((res) => res.data);
const API_PATH = "/api/groups";

const GroupsPage = () => {
  const router = useRouter();
  const { data: groupList, error } = useSWR(API_PATH, fetcher);
  if (!groupList) {
    return null;
  }

  const handleGroup = ({_id}) => {
    router.push(`/groups/${_id}`);
  };
  return (
    <div className="row row-cols-1 row-cols-md-6 g-4">
      {groupList.map((item) => (
        <div className="col" key={item._id}>
          <CardArtist name={item.name} onClick={() => handleGroup(item)} />
        </div>
      ))}
    </div>
  );
};

export default GroupsPage;
