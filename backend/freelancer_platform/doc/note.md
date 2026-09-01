Client Dashboard
My Projects
     ↓
GET /projects/client/{clientId}
Freelancer Dashboard
My Applications
     ↓
GET /applications/freelancer/{freelancerId}

JWT
String authHeader = request.getHeader("Authorization");
gets:
Authorization: Bearer eyJhbGci...
Then:
String token = authHeader.substring(7);
removes:Bearer and leaves only: eyJhbGci...
Then:
String email = jwtService.extractEmail(token);
gets the email we put into the JWT earlier:
.subject(user.getEmail())
Then we find that user:userRepository.findByEmail(email)
Finally:
SecurityContextHolder
    .getContext()
    .setAuthentication(authentication);
is basically telling Spring:
This request is authenticated. This is the user.