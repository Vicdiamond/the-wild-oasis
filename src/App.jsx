import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/GlobalStyles";

import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Bookings from "./pages/Bookings";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000, 1 minute
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/bookings/:bookingId" element={<Booking />} />
              <Route path="/checkin/:bookingId" element={<Checkin />} />
              <Route path="/account" element={<Account />} />
              <Route path="/cabins" element={<Cabins />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/users" element={<Users />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

// supabase project password
// Vicdiamond1245$

// Lectures

// 27: 2

// React query is a state managment libarary used to managing remote state
// The fetched data is cached, meaning it will be stored in order to be reused in different point of the application
// React query gives us automatic loading and error state
// it automatic refetches to keep state synced
// It also prefetch data
// Easy to update remotestate
// Offline support

// 27: 4
// We fetch data using the useQuery that comes from reactQuery
// The useQuery accepts a object that contains a queryKey that is where  the data in the datbase you want. It also contains a queryFn, that is the async function that returns a promise and that communicate with the database

// 27: 5
// When  you perform an operation with the database using the  useMutation(that is the hook that is used to change something in the database from react query) hook and wants react query to refetch the data, you have to invalidate the cache(cache is where react query stores fetched data)
// So we invalidate the cache by first calling the query client with useQueryClient
// still inside the useMutation hook, you call the onSuccess funtion that is called by react query when the mutation is a sucess
// In the onsucess function, that is where you use the queryclient and call the invalidatequeries on there (queryClient.invalidateQuries())
// Then you pass an object  to the invalidateQuries function that will have a querykey as a property, and the value will be the key you want to delete
// There is also an onError that receives an error when the operation was not successful, so the onError function receives the error.message

// 27: 12
// The onSuccess that you call inside the useMutation  cannot only be called inside that hook, but can also be called inside the mutate function the is returned by the useMutation hook
// And you can also get the newly created data on the onSuccess function the same place you call the mutate function

/////////////////////////////////////////////////////////////////////////////////////////////

// 28: 8
// HOW TO CREATE A COMPOUND COMPONENT

// 1. create a context by createContext()

// 29
// The addtional values passed into the react query can also be a dependency array that makes the react query to refetch if any of the value changes

// The useMutation function can only receive one argument, so if u want to pass in multiple things, just use an object then destructure

//When calling the mutate function that comes from the useMutation function, you can also pass in some other options  that will be in an object that will make the behaviour of the same custom hook to be a bit diferent fromanother place. {check the useDeleteBooking in the bookingDetail and bookingrow}
