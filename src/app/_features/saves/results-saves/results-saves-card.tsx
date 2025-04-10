import React from 'react'


type AdlibWithResult = {
    id: string;
    title: string;
    prompt: string;
    tags: string[];
}

type Props = {
    adlibWithResult: AdlibWithResult;
}

export default function ResultsSavesCard({ adlibWithResult }: Props) {
    return (
        (
            <Card>
                <CardHeader>
                    <CardTitle>{adlibWithResult.title}</CardTitle>
                    <CardDescription>Prompt: {adlibWithResult.prompt}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href={routerConfig.adlib.execute({ id: adlibWithResult.id })} className={buttonVariants({ variant: "default" })}>
                        Go to Response
                    </Link>
                    <Link href={routerConfig.adlib.execute({ id: adlibWithResult.id })} className={buttonVariants({ variant: "secondary" })}>
                        Go to adlib
                    </Link>
                </CardContent>
            </Card>
        )
    )
}
