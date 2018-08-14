<!DOCTYPE html>
<html>
<head>
    <title>Admin login access</title>
    <link rel="stylesheet" type="text/css" href="/css/admin.css">
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-4 col-sm-offset-4">
                <div class="form-wrapper">
                    {{ session()->get( 'error1' ) }}
                    @if(count($errors) > 0)
                        <div class="alerts-wrapper">
                        @foreach($errors->all() as $error)
                            <div class="alert alert-danger">{{ $error }}</div>
                        @endforeach
                        </div>
                    @endif
                    @if (session('error'))
                        <div class="alerts-wrapper">
                            <div class="alert alert-danger">
                                {{ session('error') }}
                            </div>
                        </div>
                    @endif
                    {!! Form::open(['url' => '/admin-access/authenticate-admin']) !!}
                        <div class="form-row">
                            {{Form::text('username', '', ['placeholder' => 'Username'])}}
                        </div>
                        <div class="form-row">
                            {{Form::password('password', ['placeholder' => 'Password'])}}
                        </div>
                        <div class="form-row submit text-center">
                            {{Form::submit('Submit')}}
                        </div>
                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>
</body>
</html>

