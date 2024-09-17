import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import useAuth from "@/hooks/useAuth";
import { fetchMerchantDataAPI, updateMerchantData } from "@/Store/MerchantSlice";
import { AppDispatch, RootState } from "@/Store/MerchantStore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileSettings() {
    const { user, logout } = useAuth();
    const dispatch = useDispatch<AppDispatch>();
    const token = user?.accessToken
    const { status, platformName, platformLogo, error } = useSelector((state: RootState) => state.merchantPlatform);

    useEffect(() => {
        if (user?.merchantId) {
            dispatch(fetchMerchantDataAPI(user.merchantId));
        }
    }, [dispatch, user?.merchantId]);

    const handleLogOut = async () => {
        await logout();
    };

    const handleUpdate = () => {
        if (token) {
            dispatch(updateMerchantData({ token, data: { platformName: 'New Name' } }));
        }
    };
    ;

    return (
        <Sheet>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'succeeded' && (
                <>
                    <SheetTrigger>
                        <Avatar>
                            <AvatarImage src={platformLogo || ''} width={10} height={10}/>
                            <AvatarFallback>{user?.merchantName?.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                    </SheetTrigger>

                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Welcome {user?.merchantName || 'Merchant'}</SheetTitle>
                            <SheetDescription>
                                PayPath Account Sheet For MerchantID: ({user?.merchantId || 'N/A'})
                            </SheetDescription>
                        </SheetHeader>

                        {/* Update Section */}
                        <div className="flex flex-col items-center justify-center gap-6 p-6">
                            <div className="flex items-center gap-4">
                                <Avatar className="w-16 h-16">
                                    <AvatarImage src={platformLogo || ''} />
                                    <AvatarFallback>Logo</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="text-lg font-semibold">Platform Name: {platformName || 'N/A'}</span>
                                    <span className="text-sm text-gray-600">{platformName || 'N/A'}</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 w-full max-w-md">
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold">Merchant Name:</label>
                                    <Input
                                        value={user?.merchantName || ''}
                                        readOnly
                                        className="bg-gray-100"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold">Merchant ID:</label>
                                    <Input
                                        value={user?.merchantId || ''}
                                        readOnly
                                        className="bg-gray-100"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold">Verification Status:</label>
                                    <Input
                                        value={user?.isVerified ? 'Verified' : 'Not Verified'}
                                        readOnly
                                        className={`bg-${user?.isVerified ? 'green' : 'red'}-100`}
                                    />
                                </div>
                            </div>
                        </div>

                        <SheetFooter>
                            <div className="absolute bottom-0 left-1/10 mb-5">
                                <Button className="w-[320px]" variant="destructive" onClick={handleLogOut}>
                                    Logout
                                </Button>
                                <Button className="w-[320px]"
                                    variant="destructive" onClick={handleUpdate}>
                                    Save
                                </Button>
                            </div>
                        </SheetFooter>
                    </SheetContent>
                </>
            )}
        </Sheet>

    );
}
