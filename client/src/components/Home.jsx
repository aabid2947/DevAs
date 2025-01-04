import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { searchUsers, getFriendRecommendations, getFriendList, sendFriendRequest } from '../utils/api';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const queryClient = useQueryClient();

  const { data: friendList } = useQuery('friendList', getFriendList);
  const { data: recommendations } = useQuery('recommendations', getFriendRecommendations);

  useEffect(() => {

    console.log(recommendations)
  }, []);

  const searchMutation = useMutation(searchUsers, {
    onSuccess: () => {
      queryClient.invalidateQueries('searchResults');
    },
  });

  const friendRequestMutation = useMutation(sendFriendRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries('friendList');
      queryClient.invalidateQueries('recommendations');
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      searchMutation.mutate(searchQuery);
    }
  };

  const handleSendFriendRequest = (userId) => {
    friendRequestMutation.mutate(userId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">Search Users</h2>
        <form onSubmit={handleSearch} className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full px-3 py-2 border rounded"
          />
          <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Search
          </button>
        </form>
        {searchMutation.data && (
          <div>
            <h3 className="text-xl font-bold mb-2">Search Results</h3>
            <ul className="space-y-2">
              {searchMutation.data.map((user) => (
                <li key={user._id} className="flex justify-between items-center bg-white p-3 rounded shadow">
                  <span>{user.username}</span>
                  <button
                    onClick={() => handleSendFriendRequest(user._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Add Friend
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Friends</h2>
        {friendList.data.length>0 && (
          <ul className="space-y-2">
            {friendList && friendList.map((friend) => (
              <li key={friend._id} className="bg-white p-3 rounded shadow">
                {friend.username}
              </li>
            ))}
          </ul>
        )}
        <h2 className="text-2xl font-bold mt-8 mb-4">Recommendations</h2>
        {/* {recommendations && (
          <ul className="space-y-2">
            {recommendations.map((user) => (
              <li key={user._id} className="flex justify-between items-center bg-white p-3 rounded shadow">
                <span>{user.username}</span>
                <button
                  onClick={() => handleSendFriendRequest(user._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Add Friend
                </button>
              </li>
            ))}
          </ul>
        )} */}
      </div>
    </div>
  );
}

